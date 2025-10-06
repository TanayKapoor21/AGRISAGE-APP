import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import EnvironmentalMonitoring from './pages/environmental-monitoring';
import MarketIntelligenceHub from './pages/market-intelligence-hub';
import CropAnalyticsDashboard from './pages/crop-analytics-dashboard';
import FarmOperationsOverview from './pages/farm-operations-overview';
import DigitalTwinSatelliteAnalytics from './pages/digital-twin-satellite-analytics';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<FarmOperationsOverview />} />
        <Route path="/environmental-monitoring" element={<EnvironmentalMonitoring />} />
        <Route path="/market-intelligence-hub" element={<MarketIntelligenceHub />} />
        <Route path="/crop-analytics-dashboard" element={<CropAnalyticsDashboard />} />
        <Route path="/farm-operations-overview" element={<FarmOperationsOverview />} />
        <Route path="/digital-twin-satellite-analytics" element={<DigitalTwinSatelliteAnalytics />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
