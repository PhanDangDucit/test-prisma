/* 
    function to get min value for an entity
*/
create
or replace function get_min_in_col_of_entity (col text, entity text) returns integer as $$
DECLARE
    min_val int;
BEGIN
    execute 'select min(' || col || ') from "' || entity || '"' into min_val;
    return min_val;
End;
$$ language plpgsql;

select
  get_min_in_col_of_entity ('view', 'Post');

/* 
    function to get max value for an entity
*/

create
or replace function get_max_in_col_of_entity (col text, entity text) returns integer as $$
DECLARE
    min_val int;
BEGIN
    execute 'select max(' || col || ') from "' || entity || '"' into min_val;
    return min_val;
End;
$$ language plpgsql;

select
  get_max_in_col_of_entity ('view', 'Post');