import Navbar from "../components/layout/Navbar";
import StudioLayout from "../components/studio/StudioLayout";

export default function StudioPage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar />
      <StudioLayout />
    </div>
  );
}
