import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts';
import { Card, ProgressBar } from 'react-bootstrap';
import './dashboard.css';

function DashboardPieChart({ headerName, passData }) {
    const myWidth = headerName === 'Category' ? 460 : 530;
    const myHeight = 280;
    const myColors = ['#FF0000', '#FFFF00', '#D400CA', '#00BD3D', '#0068FF', '#02B2AF', '#FF8000', '#60009B', '#01FDFE'];
    const [myData, setMyData] = useState();
    const [graphData, setGraphData] = useState();
    useEffect(() => {
        if (typeof passData === 'object') {
            let newData = [];
            if (headerName === 'Tag') {
                newData = passData.map((item) => {
                    return {
                        id: Number(item.tagId),
                        value: Number(item.countLesson),
                        label: item.tagName
                    };
                });
            } else if (headerName === 'Category') {
                newData = passData.map((item) => {
                    return {
                        id: Number(item.categoryId),
                        value: Number(item.countLesson),
                        label: item.categoryName
                    };
                });
            }
            setGraphData(newData);
            setMyData(passData);
        }
    }, []);
    return (
        <>
            <Card className="thanh-dashboard-card mb-2" >
                <Card.Header><Card.Title>{headerName}</Card.Title>The number of {headerName} in all course</Card.Header>
                {myData ?
                    // <>{console.log(myData)}</>
                    <PieChart skipAnimation
                        colors={myColors}
                        series={[
                            {
                                data: graphData,
                                innerRadius: 45,
                                outerRadius: 100,
                                paddingAngle: 2,
                                cornerRadius: 4,
                                startAngle: -180,
                                endAngle: 180,
                                cx: 160,
                                cy: 130,
                                arcLabel: (item) => `${item.value}`,
                            },
                        ]}
                        width={myWidth}
                        height={myHeight}
                    />
                    : <ProgressBar animated now={100} />
                }
            </Card>

        </>
    );
}

export default DashboardPieChart;