import React from 'react';
import DashBoardContainer from '../../components/dashboard/DashBoardContainer';
import ProtectedRoute from '../../services/authority/ProtectedRoute';

function Dashboard(props) {
    return (
        <div>
            <ProtectedRoute allowedRoles={['admin']}>
                <DashBoardContainer />
            </ProtectedRoute>
        </div>
    );
}

export default Dashboard;