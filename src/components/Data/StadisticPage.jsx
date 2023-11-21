import React from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const StatisticsComponent = () => {
  return (
    <div>
      <h2>Estadísticas</h2>
      <p>Aquí se muestran las estadísticas importantes:</p>
      <div>
        <TrendingUpIcon style={{ fontSize: 48, color: 'green' }} />
        <span>Incremento del 20%</span>
      </div>
      {/* Puedes agregar más elementos con el icono TrendingUp según sea necesario */}
    </div>
  );
};

export default StatisticsComponent;
