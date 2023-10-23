import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Table.css';

interface Column {
  label: string;
  field: string;
  className?: string | ((item: any) => string);
  render?: (item: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  context: 'issues' | 'projects';
  size: 'small' | 'medium' | 'large';
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, context, size }) => {


  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string }>({
    key: '',
    direction: 'asc',
  });

  useEffect(() => {

  },[data]);
  
  return (
    <div className={"issues-table-" + size}>
      <div className="main-container">
        <div className="table-container">
          <div className="table-row heading">
            {columns.map((column, index) => (
              <div
              className={`row-item ${sortConfig.key === column.field ? `sorted ${sortConfig.direction}` : ''}`}
              key={index}
              // onClick={() => sortData(column.field)}
            >
              {column.label}
            </div>
            ))}
          </div>
          {data.map((item) => (
            <Link to={`/${context}/${item._id}`} className="table-row" key={item._id}>
              {columns.map((column, index) => (
       
                <div className={`row-item ${typeof column.className === 'function' ? column.className(item) : column.className}`} key={index}>
                  {column.render ? column.render(item) : item[column.field]}
                </div>
              ))}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};


export default DataTable;
