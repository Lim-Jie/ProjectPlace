import DataTable from '../components/TableAdmin';
import ProductLoader from "../components/AdminProductLoader";


const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  // Add more data as needed
];


export default function Dashboard() {


    return (
      <div className="min-h-screen flex flex-col">
            <h1>Data Table</h1>
            <DataTable data={data} />
            <ProductLoader/>
          
      </div>
    );
  }
  

  