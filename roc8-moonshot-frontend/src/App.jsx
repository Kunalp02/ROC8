import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BarChart,
    Bar,
    YAxis,
    XAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    LineChart,
    Line,
    ResponsiveContainer,
    Brush,
} from 'recharts';

const App = () => {
    const [data, setData] = useState([]);
    const [ageFilter, setAgeFilter] = useState('All');
    const [genderFilter, setGenderFilter] = useState('All');
    const [selectedFeature, setSelectedFeature] = useState('A'); // Default feature for line chart
    const [lineData, setLineData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/data');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const applyFilters = (data) => {
        return data.filter(item => {
            const ageMatch = ageFilter === 'All' || item.Age === ageFilter;
            const genderMatch = genderFilter === 'All' || item.Gender === genderFilter;
            return ageMatch && genderMatch;
        });
    };

    const totalValues = applyFilters(data).reduce((acc, item) => {
        acc.A += item.A;
        acc.B += item.B;
        acc.C += item.C;
        acc.D += item.D;
        acc.E += item.E;
        acc.F += item.F;
        return acc;
    }, { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 });

    const chartData = Object.entries(totalValues).map(([key, value]) => ({
        feature: key,
        total: value,
    }));

    const handleBarClick = (feature) => {
        const filteredData = applyFilters(data);
        const lineChartData = filteredData.map(item => ({
            Day: item.Day,
            value: item[feature],
        }));
        
        console.log('Filtered Data:', filteredData);
        console.log('Line Chart Data:', lineChartData);

        setLineData(lineChartData);
        setSelectedFeature(feature);
    };

    return (
        <div>
            <h1>Total Time Spent on Features</h1>

            <div>
                <label>
                    Age:
                    <select onChange={(e) => setAgeFilter(e.target.value)} value={ageFilter}>
                        <option value="All">All</option>
                        <option value="15-25">15-25</option>
                        <option value=">25">25</option>
                    </select>
                </label>
                <label>
                    Gender:
                    <select onChange={(e) => setGenderFilter(e.target.value)} value={genderFilter}>
                        <option value="All">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </label>
            </div>

            <BarChart
                layout="vertical"
                width={600}
                height={400}
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis dataKey="feature" type="category" />
                <XAxis type="number" />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" onClick={({ feature }) => handleBarClick(feature)} />
            </BarChart>

            <h2>Time Trend for Feature: {selectedFeature}</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={lineData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#ff7300" />
                    <Brush />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default App;
