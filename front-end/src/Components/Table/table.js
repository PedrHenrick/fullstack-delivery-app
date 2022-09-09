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
      {allUsers.map(({ name, role, email, id }, index) => (
        <tr key={ name }>
          <td data-testid={ `admin_manage__element-user-table-item-number-${index + 1}` }>
            {index + 1}
          </td>
          <td data-testid={ `admin_manage__element-user-table-name-${index + 1}` }>
            {name}
          </td>
          <td data-testid={ `admin_manage__element-user-table-email-${index + 1}` }>
            {email}
          </td>
          <td data-testid={ `admin_manage__element-user-table-role-${index + 1}` }>
            {role}
          </td>
          <td>
            <button
              type="button"
              data-testid={ `admin_manage__element-user-table-remove-${index + 1}` }
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
