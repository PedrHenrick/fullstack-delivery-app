import React, { useState, useEffect } from 'react';
import { deleteUser, requestGetWithToken } from '../../utils/requests';

export default function DenseTable() {
  const [allUsers, setAllUsers] = useState([]);
  const [tableAtt, setTableAtt] = useState(true);

  const { token } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    (() => {
      requestGetWithToken('/users', token).then((e) => setAllUsers(e));
    })();
  }, [token, tableAtt]);

  return (
    <table>
      {allUsers.map(({ name, role, email, id }) => (
        <tr key={ name }>
          <td datatest-id={ `admin_manage__element-user-table-item-number-${id}` }>
            {id}
          </td>
          <td datatest-id={ `admin_manage__element-user-table-name-${id}` }>
            {name}
          </td>
          <td datatest-id={ `admin_manage__element-user-table-email-${id}` }>
            {email}
          </td>
          <td datatest-id={ `admin_manage__element-user-table-role-${id}` }>
            {role}
          </td>
          <td>
            <button
              type="button"
              datatest-id={ `admin_manage__element-user-table-remove-${id}` }
              onClick={ async () => {
                await deleteUser(`/user/${id}`, { id }, token);
                setTableAtt(!tableAtt);
              } }
            >
              Excluir
            </button>
          </td>
        </tr>
      ))}
    </table>
  );
}
