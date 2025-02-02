import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});
const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<AppRoutes />
			</Router>
		</QueryClientProvider>
	);
};

export default App;
