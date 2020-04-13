package gov.data.common.neo4j;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.neo4j.driver.v1.AuthTokens;
import org.neo4j.driver.v1.Driver;
import org.neo4j.driver.v1.GraphDatabase;
import org.neo4j.driver.v1.Record;
import org.neo4j.driver.v1.Session;
import org.neo4j.driver.v1.StatementResult;
import org.neo4j.driver.v1.Transaction;
import org.neo4j.driver.v1.TransactionWork;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class CypherExecutor {

	 
	private List<String>  messages = new ArrayList<String>();
	
	 public void run(String uri,String user,String password,String cypher,String output) {
		
		
		 List<String>  excelData = new ArrayList<String>();
		 // execution cypher query 
		 excelData =  executeCypher(uri,user,password,cypher,output);
		 
		 messages.add("Neo4j_URL:");
		 messages.add(uri);
		 messages.add("User_name:");
		 messages.add(user);
		 messages.add("PWD:");
		 messages.add(password);
		 messages.add("Cypher:");
		 messages.add(cypher);
		 messages.add("Output:");
		 messages.add(output);
	
		export(excelData , output);
		
	 }
	 
	 
	 @SuppressWarnings("finally")
	public List<String>  executeCypher(String uri,String user,String password,String cypher,String outputFile) {
		
		 Gson gson = new Gson();
		// function's return value, list of records in json string format
		List<String>  output = new ArrayList<String>();
	 try {
			 // Neo4j driver
		 Driver driver = (Driver) GraphDatabase.driver( uri, AuthTokens.basic( user, password ) );
	
		 
		 Session session = driver.session();
	        
			 // execute the transactions
			 output = session.writeTransaction( new TransactionWork<List<String> >()
	            {
				 	// get result
	                @Override
	                public List<String>  execute( Transaction tx )
	                {
	                	// result in statementResult format
	                    StatementResult result = tx.run(cypher);
	                    
	                    //store all the records in a list 
						List<String> cypherOutput = new ArrayList<String>();
						while ( result.hasNext() ) {
							// iterate the result set and convert it into json format
						    Record record = result.next();
						    cypherOutput.add(gson.toJson(record.asMap()));
						}
	                    return cypherOutput;
	                }
	            } );
			 
		 	 driver.close();
		 	 return output;
	        }catch(Exception e ) {
	        	System.out.print(e.getMessage());
	        	
	        	messages.add(e.getMessage());
	        
	        }finally{
	    		 return output;
	        }
		 
	 }
	
	

	 
	 public void export(List<String> data, String output) {
		 
		// define json parser
		JsonParser jsonParser = new JsonParser();
		 
		 // Define workboox
		 Workbook workbook = new XSSFWorkbook();
		 
		 // given sheet name
		 Sheet sheet = workbook.createSheet("CypherOutput");
		 
		 // create header row
		 Row header = sheet.createRow(0);
		 if(null!=data && data.size()>0) {
			 
			// create header
			 // Parser first record as Json Object
			 JsonElement headerJsonTree = jsonParser.parse(data.get(0));
			 JsonObject headerJsonObject = headerJsonTree.getAsJsonObject();
			 
			 // Get a collection-view of the records
			 Set<Map.Entry<String,JsonElement>> setHeaderDate = headerJsonObject.entrySet();
			 int headerIndex = 0;
			 
			// Iterate the collection-view of the records
			 for(Map.Entry<String, JsonElement> m : setHeaderDate) {
					 System.out.println("Header :  "+m.getKey());
					 
					 // create cell
					 Cell headerCell = header.createCell(headerIndex);
					 
					 // fill cell with key value 
					 headerCell.setCellValue(m.getKey());
					 headerIndex++;
			 }

			 
			 // write record into excel
			 int rowIndex = 0;
			 for(String str : data) {
				System.out.println("Data STR:  "+str);
				rowIndex++;
				
				// Create row 
				Row row = sheet.createRow(rowIndex);
				
				//  Parse a record
				JsonElement jsonTree = jsonParser.parse(str);
				
				// make sure it is  a Json Object
				if(jsonTree.isJsonObject()) {
					
					// Parser as Json Object
					JsonObject jsonObject = jsonTree.getAsJsonObject();
					 
					 // Get a collection-view of the records
					 Set<Map.Entry<String,JsonElement>> setDate = jsonObject.entrySet();
					 int recordIndex = 0 ;
					 
					 // Iterate the collection-view of the records
					 for(Map.Entry<String, JsonElement> m : setDate) {
						 
						// create cell
						 Cell cell = row.createCell(recordIndex);
						 // fill cell with  value 
						 cell.setCellValue(m.getValue().toString().replace("\"", ""));
						 recordIndex++;
					 }
				 };
				
			 }
			 
			 
		 }
		 
		 
		 
		 // given sheet name
		 Sheet infoSheet = workbook.createSheet("Message");
		 // create header row
		 int messageIndex = 0 ;
		 for(String message : messages) {
			 Row row = infoSheet.createRow(messageIndex);
			 Cell cell = row.createCell(0);
			 cell.setCellValue(message.replace("\"", ""));
			 messageIndex++;
		 }
		
		 
		// Save as file
		FileOutputStream outputStream;
		try {
			outputStream = new FileOutputStream(output);
			 workbook.write(outputStream);
			 workbook.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	 }
	 
	 public static void main (String[] args) {
		 CypherExecutor executor = new CypherExecutor();
		 String query = "MATCH (t:clinical_trial)<--(a:arm)<--(:assignment_report)-[*]->(c:case) WITH DISTINCT c AS c, t ,a  OPTIONAL MATCH (c)<-[*]-(f:file)  Return c.case_id  As case_id,t.clinical_trial_designation as clinical_trial_code,a.arm_id As arm_id, a.arm_drug As arm_drug, a.pubmed_id As pubmed_id, c.disease As disease, c.gender As gender, c.race As race, c.ethnicity As ethnicity, t.clinical_trial_id As clinical_trial_id, a.arm_id+'_'+ a.arm_drug As trial_arm, COLLECT(DISTINCT(f.file_type)) AS file_types, COLLECT(DISTINCT(f.file_format)) AS file_formats, COLLECT(DISTINCT(f)) AS files";
		 String neo4jServer = "bolt://nabc/";
		 String userName="abc";
		 String pwd="abc";
		 String output="/Users/cheny39/Documents/tmp.csv";
		 executor.run(neo4jServer,userName,pwd, query,output);
	 }
}
