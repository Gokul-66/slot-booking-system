import styles from './VerticalMonthList.module.scss';

export const MONTH_COLORS = [
  '#F4F1F6',
  '#F1ECF4',
  '#EFEDF3',
  '#EBE4F0',
  '#E8DBEE',
  '#E5D2EB',
  '#E2C9E9',
  '#DFC0E6',
  '#E8D6E2',
  '#E0C4DD',
  '#EAD7E6',
  '#F1E8EE',
];

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

interface Props {
  activeMonth: number;
  onSelect: (monthIndex: number) => void;
}

const VerticalMonthList: React.FC<Props> = ({ activeMonth, onSelect }) => {
  return (
    <div className={styles.container}>
      {MONTHS.map((month, index) => (
        <button
          key={month}
          className={`${styles.month} ${index === activeMonth ? styles.active : ''
            }`}
          style={{
            backgroundColor: index === activeMonth ? undefined : MONTH_COLORS[index],
          }}
          onClick={() => onSelect(index)}
        >
          {month}
        </button>
      ))}
    </div>
  );
};

export default VerticalMonthList;
