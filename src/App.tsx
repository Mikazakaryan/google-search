import InputForm from "./components/InputForm";
import { useLinksContext } from "./contexts/links";
import CardItem from "./components/CardItem";

import "./app.css";

const App = () => {
  const { data, isLoading } = useLinksContext();

  return (
    <div className="app-container">
      <InputForm />
      <div className="content-wrapper">
        {data?.map((item) => (
          <CardItem item={item} />
        ))}
        {isLoading && <span>Loading ...</span>}
      </div>
    </div>
  );
};

export default App;
