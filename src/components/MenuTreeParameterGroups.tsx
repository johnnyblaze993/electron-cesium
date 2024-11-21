import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const MenuTreeParameterGroups = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [formData, setFormData] = useState({
    sensors: {},
    fixedWeapons: {},
    mslWeapons: {},
    uasThreat: {},
  });

  const handleChange = (
    section: string,
    field: string,
    value: any,
    type: string
  ) => {
    let parsedValue = value;
    if (type === 'int') parsedValue = parseInt(value, 10);
    if (type === 'float') parsedValue = parseFloat(value);

    setFormData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], [field]: parsedValue },
    }));
  };

  const renderInput = (
    section: string,
    field: string,
    label: string,
    type: string,
    description: string,
    placeholder: string
  ) => (
    <div style={{ margin: '10px 0', width: isMobile ? '100%' : '48%' }}>
      <label>
        <b>{label}:</b> {description}
      </label>
      <input
        type={type === 'float' || type === 'int' ? 'number' : 'text'}
        step={type === 'float' ? 'any' : undefined}
        placeholder={placeholder}
        onChange={(e) => handleChange(section, field, e.target.value, type)}
        style={{
          width: '100%',
          padding: '5px',
          marginTop: '5px',
        }}
      />
    </div>
  );

  const renderRadio = (
    section: string,
    field: string,
    label: string,
    description: string,
    options: number[]
  ) => (
    <div style={{ margin: '10px 0', width: '100%' }}>
      <label>
        <b>{label}:</b> {description}
      </label>
      <div>
        {options.map((option) => (
          <label key={option} style={{ marginRight: '10px' }}>
            <input
              type="radio"
              name={field}
              value={option}
              onChange={(e) => handleChange(section, field, e.target.value, 'int')}
            />{' '}
            {option}
          </label>
        ))}
      </div>
    </div>
  );

  const renderSection = (
    section: string,
    title: string,
    fields: {
      field: string;
      label: string;
      type: string;
      description: string;
      placeholder?: string;
      options?: number[];
    }[]
  ) => (
    <div style={{ marginBottom: '20px' }}>
      <h3>{title}</h3>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2%',
          justifyContent: isMobile ? 'center' : 'flex-start',
        }}
      >
        {fields.map((field) =>
          field.options
            ? renderRadio(section, field.field, field.label, field.description, field.options)
            : renderInput(
                section,
                field.field,
                field.label,
                field.type,
                field.description,
                field.placeholder || ''
              )
        )}
      </div>
    </div>
  );

  return (
    <form style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      {renderSection('sensors', '1. Sensors Object Class', [
        { field: 'scanRate', label: 'Scan Rate', type: 'float', description: 'Time for one complete maximum azimuth/elevation scan', placeholder: 'Seconds' },
        { field: 'startingAzimuth', label: 'Starting Azimuth', type: 'float', description: 'Starting azimuth angle of scanning', placeholder: 'Degrees' },
        { field: 'endingAzimuth', label: 'Ending Azimuth', type: 'float', description: 'Ending azimuth angle of scanning', placeholder: 'Degrees' },
        { field: 'lowerElevation', label: 'Lower Elevation', type: 'float', description: 'Lower elevation angle of scanning', placeholder: 'Degrees' },
        { field: 'upperElevation', label: 'Upper Elevation', type: 'float', description: 'Upper elevation angle of scanning', placeholder: 'Degrees' },
        { field: 'minimumRange', label: 'Minimum Range', type: 'float', description: 'Minimum range of scanning', placeholder: 'Meters' },
        { field: 'maximumRange', label: 'Maximum Range', type: 'float', description: 'Maximum range of scanning', placeholder: 'Meters' },
      ])}
      {renderSection('fixedWeapons', '2. Fixed Weapon Object Class', [
        { field: 'azimuthLimitLeft', label: 'Azimuth Limit Left', type: 'float', description: 'Left limitation of firing', placeholder: 'Degrees' },
        { field: 'azimuthLimitRight', label: 'Azimuth Limit Right', type: 'float', description: 'Right limitation of firing', placeholder: 'Degrees' },
        { field: 'lowerElevation', label: 'Lower Elevation', type: 'float', description: 'Lower limit elevation angle of firing', placeholder: 'Degrees' },
        { field: 'upperElevation', label: 'Upper Elevation', type: 'float', description: 'Upper limit elevation angle of firing', placeholder: 'Degrees' },
        { field: 'minimumRange', label: 'Minimum Range', type: 'float', description: 'Minimum range (too close)', placeholder: 'Meters' },
        { field: 'maximumRange', label: 'Maximum Range', type: 'float', description: 'Maximum range of rounds', placeholder: 'Meters' },
        { field: 'firingRate', label: 'Firing Rate', type: 'int', description: 'Standard rounds of ammo expended per second', placeholder: 'Rounds/sec' },
        { field: 'maximumSlewRate', label: 'Maximum Slew Rate', type: 'float', description: 'Maximum rate of slewing from original position', placeholder: 'Deg/sec' },
      ])}
      {renderSection('uasThreat', '4. UAS Threat Object Class', [
        { field: 'uasClass', label: 'UAS Class', type: 'int', description: 'UAS class designation (1 - 5)', options: [1, 2, 3, 4, 5] },
        { field: 'flightVelocity', label: 'Flight Velocity', type: 'float', description: 'Average flight velocity over entire flight', placeholder: 'Meters/sec' },
        { field: 'minimumRange', label: 'Minimum Range', type: 'float', description: 'Minimum range of drone flight', placeholder: 'Meters' },
        { field: 'maximumRange', label: 'Maximum Range', type: 'float', description: 'Maximum range of drone flight', placeholder: 'Meters' },
        { field: 'minimumAltitude', label: 'Minimum Altitude', type: 'float', description: 'Minimum altitude limit of drone flight', placeholder: 'Meters' },
        { field: 'maximumAltitude', label: 'Maximum Altitude', type: 'float', description: 'Maximum altitude limit of drone flight', placeholder: 'Meters' },
        { field: 'maximumTurnRate', label: 'Maximum Turn Rate', type: 'float', description: 'Maximum turn rate during corrections', placeholder: 'Deg/sec' },
      ])}
    </form>
  );
};

export default MenuTreeParameterGroups;
