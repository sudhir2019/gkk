import PointTransfer from './pages/PointTransfer';
import MultiPointTransfer from './pages/MultiPointTransfer';
import DrawDetails from './pages/DrawDetails';
import Revenue from './pages/Revenue';
import AgentDetails from './pages/AgentDetails';
import RevenueRecovery from './pages/RevenueRecovery';
import PokerRevenue from './pages/PokerRevenue';
import React from 'react';
import MultipleCybers from './pages/MultipleCybers';
import DailyStatus from './pages/DailyStatus';
import NonPerfomerAgent from './pages/NonPerfomerAgent';
import AgentStatus from './pages/AgentStatus';
import BalanceReport from './pages/BalanceReport';
import ComputerLoan from './pages/ComputerLoan';
import AgentMailDetails from './pages/AgentMailDetails';
import ManagerMailDetails from './pages/ManagerMailDetails';
import WeeklyDetailsReport from './pages/WeeklyDetailsReport';

// Role-Based Routes
const roleBasedRoutes = {
    superadmin: [
        { path: "reports/pointtransfer", element: <PointTransfer /> },
        { path: "reports/multipointtransfer", element: <MultiPointTransfer /> },
        { path: "reports/revenue", element: <Revenue /> },
        { path: "reports/pokerrevenue", element: <PokerRevenue /> },
        { path: "reports/dailystatus", element: <DailyStatus /> },
        { path: "reports/agentdetails", element: <AgentDetails /> },
        { path: "reports/revenuerecovery", element: <RevenueRecovery /> },
        { path: "reports/computerloan", element: <ComputerLoan /> },
        { path: "reports/multiplecybers", element: <MultipleCybers /> },
        { path: "reports/nonperfomeragent", element: <NonPerfomerAgent /> },
        { path: "reports/agenstatus", element: <AgentStatus /> },
        { path: "reports/balancereport", element: <BalanceReport /> },
        { path: "mailreports/agentmaildetails", element: <AgentMailDetails /> },
        { path: "mailreports/managermaildetails", element: <ManagerMailDetails /> },
        { path: "weeklydetailsreport", element: <WeeklyDetailsReport /> },
        { path: "drawdetails/:name/:id", element: <DrawDetails /> },
    ],
    admin: [
        { path: "reports", element: <PointTransfer /> },
        { path: "reports/pointtransfer", element: <PointTransfer /> },
        { path: "reports/multipointtransfer", element: <MultiPointTransfer /> },
        { path: "reports/revenue", element: <Revenue /> },
        { path: "reports/pokerrevenue", element: <PokerRevenue /> },
        { path: "reports/dailystatus", element: <DailyStatus /> },
        { path: "reports/agentdetails", element: <AgentDetails /> },
        { path: "reports/revenuerecovery", element: <RevenueRecovery /> },
        { path: "reports/computerloan", element: <ComputerLoan /> },
        { path: "reports/multiplecybers", element: <MultipleCybers /> },
        { path: "reports/nonperfomeragent", element: <NonPerfomerAgent /> },
        { path: "reports/agenstatus", element: <AgentStatus /> },
        { path: "reports/balancereport", element: <BalanceReport /> },
        { path: "drawdetails/:name/:id", element: <DrawDetails /> },
        { path: "mailreports/agentmaildetails", element: <AgentMailDetails /> },
        { path: "mailreports/managermaildetails", element: <ManagerMailDetails /> },
        { path: "weeklydetailsreport", element: <WeeklyDetailsReport /> },
    ],
    superareamanager: [
        { path: "reports", element: <PointTransfer /> },
        { path: "reports/pointtransfer", element: <PointTransfer /> },
        { path: "reports/multipointtransfer", element: <MultiPointTransfer /> },
        { path: "reports/revenue", element: <Revenue /> },
        { path: "reports/pokerrevenue", element: <PokerRevenue /> },
        { path: "reports/dailystatus", element: <DailyStatus /> },
        { path: "reports/agentdetails", element: <AgentDetails /> },
        { path: "reports/revenuerecovery", element: <RevenueRecovery /> },
        { path: "reports/computerloan", element: <ComputerLoan /> },
        { path: "reports/multiplecybers", element: <MultipleCybers /> },
        { path: "reports/nonperfomeragent", element: <NonPerfomerAgent /> },
        { path: "reports/agenstatus", element: <AgentStatus /> },
        { path: "reports/balancereport", element: <BalanceReport /> },
        { path: "drawdetails/:name/:id", element: <DrawDetails /> },
        { path: "mailreports/agentmaildetails", element: <AgentMailDetails /> },
        { path: "mailreports/managermaildetails", element: <ManagerMailDetails /> },
        { path: "weeklydetailsreport", element: <WeeklyDetailsReport /> },
    ],
    areamanager: [
        { path: "reports", element: <PointTransfer /> },
        { path: "reports/pointtransfer", element: <PointTransfer /> },
        { path: "reports/multipointtransfer", element: <MultiPointTransfer /> },
        { path: "reports/revenue", element: <Revenue /> },
        { path: "reports/pokerrevenue", element: <PokerRevenue /> },
        { path: "reports/dailystatus", element: <DailyStatus /> },
        { path: "reports/agentdetails", element: <AgentDetails /> },
        { path: "reports/revenuerecovery", element: <RevenueRecovery /> },
        { path: "reports/computerloan", element: <ComputerLoan /> },
        { path: "reports/multiplecybers", element: <MultipleCybers /> },
        { path: "reports/nonperfomeragent", element: <NonPerfomerAgent /> },
        { path: "reports/agenstatus", element: <AgentStatus /> },
        { path: "reports/balancereport", element: <BalanceReport /> },
        { path: "drawdetails/:name/:id", element: <DrawDetails /> },
        { path: "mailreports/agentmaildetails", element: <AgentMailDetails /> },
        { path: "mailreports/managermaildetails", element: <ManagerMailDetails /> },
        { path: "weeklydetailsreport", element: <WeeklyDetailsReport /> },
    ],
    master: [
        { path: "reports", element: <PointTransfer /> },
        { path: "reports/pointtransfer", element: <PointTransfer /> },
        { path: "reports/multipointtransfer", element: <MultiPointTransfer /> },
        { path: "reports/revenue", element: <Revenue /> },
        { path: "reports/pokerrevenue", element: <PokerRevenue /> },
        { path: "reports/dailystatus", element: <DailyStatus /> },
        { path: "reports/agentdetails", element: <AgentDetails /> },
        { path: "drawdetails/:name/:id", element: <DrawDetails /> },
        { path: "mailreports/agentmaildetails", element: <AgentMailDetails /> },
        // { path: "reports/revenuerecovery", element: <RevenueRecovery /> },
        // { path: "reports/computerloan", element: <ComputerLoan /> },
        // { path: "reports/multiplecybers", element: <MultipleCybers /> },
        // { path: "reports/nonperfomeragent", element: <NonPerfomerAgent /> },
        // { path: "reports/agenstatus", element: <AgentStatus /> },
        // { path: "reports/balancereport", element: <BalanceReport /> },
        // { path: "mailreports/managermaildetails", element: <ManagerMailDetails /> },
        // { path: "weeklydetailsreport", element: <WeeklyDetailsReport /> },
    ],
    player: [
        { path: "reports", element: <PointTransfer /> },
        { path: "reports/pointtransfer", element: <PointTransfer /> },
        { path: "reports/multipointtransfer", element: <MultiPointTransfer /> },
        { path: "drawdetails/:name/:id", element: <DrawDetails /> },
    ]
};

export default roleBasedRoutes;