import { createBrowserRouter } from "react-router";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import SearchResultsScreen from "./screens/SearchResultsScreen";
import CitySelectionScreen from "./screens/CitySelectionScreen";
import FiltersScreen from "./screens/FiltersScreen";
import EventListScreen from "./screens/EventListScreen";
import EventDetailScreen from "./screens/EventDetailScreen";
import TripPlanningScreen from "./screens/TripPlanningScreen";
import AccommodationScreen from "./screens/AccommodationScreen";
import MapScreen from "./screens/MapScreen";
import DateSelectionScreen from "./screens/DateSelectionScreen";
import DataEntryScreen from "./screens/DataEntryScreen";
import PaymentScreen from "./screens/PaymentScreen";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MyTripsScreen from "./screens/MyTripsScreen";
import AIRecommendationsScreen from "./screens/AIRecommendationsScreen";
import CollaborativeScreen from "./screens/CollaborativeScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/login",
    Component: LoginScreen,
  },
  {
    path: "/onboarding/:step",
    Component: OnboardingScreen,
  },
  {
    path: "/home",
    Component: HomeScreen,
  },
  {
    path: "/search",
    Component: SearchScreen,
  },
  {
    path: "/search/results",
    Component: SearchResultsScreen,
  },
  {
    path: "/search/city/:city",
    Component: CitySelectionScreen,
  },
  {
    path: "/filters",
    Component: FiltersScreen,
  },
  {
    path: "/events/:category",
    Component: EventListScreen,
  },
  {
    path: "/event/:id",
    Component: EventDetailScreen,
  },
  {
    path: "/plan/:eventId",
    Component: TripPlanningScreen,
  },
  {
    path: "/accommodation/:eventId",
    Component: AccommodationScreen,
  },
  {
    path: "/map/:eventId",
    Component: MapScreen,
  },
  {
    path: "/booking/date/:eventId",
    Component: DateSelectionScreen,
  },
  {
    path: "/booking/data/:eventId",
    Component: DataEntryScreen,
  },
  {
    path: "/booking/payment/:eventId",
    Component: PaymentScreen,
  },
  {
    path: "/booking/confirmation",
    Component: ConfirmationScreen,
  },
  {
    path: "/profile",
    Component: ProfileScreen,
  },
  {
    path: "/trips",
    Component: MyTripsScreen,
  },
  {
    path: "/ai-recommendations",
    Component: AIRecommendationsScreen,
  },
  {
    path: "/collaborative",
    Component: CollaborativeScreen,
  },
]);
