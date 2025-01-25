import React from 'react';

interface RoleDropdownProps {
  selectedRole: string;
  onChange: (role: string) => void;
}

const RoleDropdown: React.FC<RoleDropdownProps> = ({
  selectedRole,
  onChange,
}) => {
  const roles = ['Admin', 'Manager', 'Employee'];

  return (
    <div className="role-dropdown">
      <select value={selectedRole} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>
          Select a role
        </option>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoleDropdown;
