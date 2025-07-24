// src/components/EnvironmentSwitcherButton.tsx
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useEnvironment } from '../environments/EnvironmentContext';
import { environments, customEnvironmentNames } from '../environments/types.ts';

const EnvironmentSwitcherButton: React.FC = () => {
  const { currentEnvironment, setEnvironment } = useEnvironment();

  const getDisplayName = (env: string) => {
    return customEnvironmentNames[env as keyof typeof customEnvironmentNames] ||
           env.charAt(0).toUpperCase() + env.slice(1);
  };

  return (
    <Dropdown className="position-fixed bottom-0 end-0 p-3">
      <Dropdown.Toggle variant="primary" id="dropdown-basic"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          boxShadow: '0px 2px 10px rgba(0,0,0,0.2)'
        }}>
        ⚙️
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Header>Environmnent: {getDisplayName(currentEnvironment)}</Dropdown.Header>
        <Dropdown.Divider />
        {environments.map((env) => (
          <Dropdown.Item
            key={env}
            onClick={() => setEnvironment(env)}
            active={currentEnvironment === env}
          >
            {getDisplayName(env)}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default EnvironmentSwitcherButton;