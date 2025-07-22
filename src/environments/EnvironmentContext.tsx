// src/contexts/EnvironmentContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react'; // <--- CAMBIO AQUÍ
import type { Environment } from './types'; // <--- CAMBIO AQUÍ

interface EnvironmentContextType {
  currentEnvironment: Environment;
  setEnvironment: (env: Environment) => void;
}

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(undefined);

interface EnvironmentProviderProps {
  children: ReactNode;
}

export const EnvironmentProvider: React.FC<EnvironmentProviderProps> = ({ children }) => {
  const [currentEnvironment, setCurrentEnvironment] = useState<Environment>(() => {
    // Intenta obtener el entorno de localStorage, si no, usa 'dev' por defecto
    const storedEnv = localStorage.getItem('appEnvironment') as Environment;
    return storedEnv && ['dev', 'maestro', 'fiscalizacion', 'staging', 'production'].includes(storedEnv)
      ? storedEnv
      : 'dev';
  });

  useEffect(() => {
    localStorage.setItem('appEnvironment', currentEnvironment);
  }, [currentEnvironment]);

  const setEnvironment = (env: Environment) => {
    setCurrentEnvironment(env);
  };

  return (
    <EnvironmentContext.Provider value={{ currentEnvironment, setEnvironment }}>
      {children}
    </EnvironmentContext.Provider>
  );
};

export const useEnvironment = () => {
  const context = useContext(EnvironmentContext);
  if (context === undefined) {
    throw new Error('useEnvironment must be used within an EnvironmentProvider');
  }
  return context;
};