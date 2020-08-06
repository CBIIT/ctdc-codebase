const defaultQuery = `# Welcome to GraphiQL
#
# GraphiQL is an in-browser tool for writing, validating, and
# testing GraphQL queries.
#
# Type queries into this side of the screen, and you will see intelligent
# typeaheads aware of the current GraphQL type schema and live syntax and
# validation errors highlighted within the text.
#
# GraphQL queries typically start with a "{" character. Lines that starts
# with a # are ignored.
#
# An example GraphQL query might look like:
#
#     {
#       field(arg: "value") {
#         subField
#       }
#     }
#
# Keyboard shortcuts:
#
#  Prettify Query:  Shift-Ctrl-P (or press the prettify button above)
#
#     Merge Query:  Shift-Ctrl-M (or press the merge button above)
#
#       Run Query:  Ctrl-Enter (or press the play button above)
#
#   Auto Complete:  Ctrl-Space (or just start typing)
#

`; // Duck-type promise detection.

const customDefaultQuery = `# Example queries:
#
# To get a list of query types:
#
# {
#   __schema {
#   types
#   { name }
#   }
# }
#
# Inspect a query (in this case, the "arm" query type):
#
# {
#   __type(name: "arm")
#   { name fields { name }
#   }
# }
#
# This returns all the names of all the fields returned by the query type "arm"
#
#
#
# Run a query (in this case, run the "arm" query type and return the list of Cases. For each Case return the Case_Id, Gender and CTEP_Subcategory):
# 
# {
#   arm {
#   arm_id
#   cases
#   { case_id gender ctep_subcategory }
#   }
# }
`;

const assamblePlaceHolder = () => defaultQuery + customDefaultQuery;

export default assamblePlaceHolder();
