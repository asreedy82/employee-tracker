const allDeptSql = `SELECT * FROM department`;

const allRolesSql = `SELECT r.id, r.title, r.salary, d.name as department FROM role r join department d on r.department_id = d.id`;

const allEmpSql = `SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary, 
case 
    when manager_id is null then 'null'
    else m.manager
    end as manager
FROM employee e left join role r on e.role_id = r.id
left join department d on r.department_id = d.id
left join (select id, concat (first_name, " ", last_name) as manager from employee) m on e.manager_id = m.id`;

const addDeptSql = `INSERT INTO department (name) VALUES (?)`;

const addRoleSql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

const getDeptIdSql = `select id from department where name = ?`;

const getMgrIdSql = `select m.id from 
(select id, concat (first_name, " ", last_name) as manager from employee where manager_id is not null) m
where m.manager = ?`;

const getRoleIdSql = `select id from role where title = ?`

const addEmpSql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

const updateEmpRoleSql = `UPDATE employee SET role_id = ? where id = ?`;

const getEmpIdSql = `select id from employee where concat (first_name, " ", last_name) = ?`;

const updateEmpMgr = `UPDATE employee SET manager_id = ? where id = ?`;

module.exports = { allDeptSql, allRolesSql, allEmpSql, addDeptSql, addRoleSql, getDeptIdSql, getMgrIdSql, getRoleIdSql, addEmpSql, updateEmpRoleSql, getEmpIdSql, updateEmpMgr };
