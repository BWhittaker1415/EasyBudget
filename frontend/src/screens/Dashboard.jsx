import { useDashboardMutation } from "../slices/usersApiSlice";

const HomeScreen = () => {
  const [dashboard] = useDashboardMutation();

  return <div>Dashboard / HomeScreen</div>;
};

export default HomeScreen;
