import Flow from "./components/Flow";
import FlowContextProvider from "./contexts/flow-context";

export default function App() {
  return (
    <FlowContextProvider>
      <Flow />
    </FlowContextProvider>

  );
}
