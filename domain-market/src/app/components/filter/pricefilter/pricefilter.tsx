import React from 'react';
import { Range, getTrackBackground } from 'react-range';
import styles from './pricefilter.module.scss';

interface PriceilterProps {
  min: number;
  max: number;
  values: number[];
  onChange: (values: number[]) => void;
}

const PriceFilter: React.FC<PriceilterProps> = ({
  min,
  max,
  values,
  onChange,
}) => {
  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValues = [...values];
    newValues[index] = parseFloat(event.target.value);
    onChange(newValues);
  };

  return (
    <div className={styles.priceSlider}>
      <h4>ფასები</h4>

      <div className={styles.inputContainer}>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <input
              name='priceFilter'
              type='number'
              value={values[0]}
              onChange={(e) => handleInputChange(0, e)}
              min={min}
              max={values[1] - 1}
              step={1}
            />
            <div className={styles.currencySymbol}>₾</div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type='number'
              name='priceFilter'
              value={values[1]}
              onChange={(e) => handleInputChange(1, e)}
              min={values[0] + 1}
              max={max}
              step={1}
            />
            <div className={styles.currencySymbol}>₾</div>
          </div>
        </div>
      </div>
      <Range
        step={1}
        min={min}
        max={max}
        values={values}
        onChange={onChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className={styles.rangeTrack}
            style={{
              background: getTrackBackground({
                values,
                colors: ['#ccc', '#99CC66', '#ccc'],
                min,
                max,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div {...props} key={props.key} className={styles.rangeThumb} />
        )}
      />
    </div>
  );
};

export default PriceFilter;
