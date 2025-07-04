import { LoaderIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

function PageLoader() {
  const { theme } = useThemeStore();
  return (
    <div>
      <div
        data-theme={theme}
        className="flex justify-center items-center min-h-screen"
      >
        <LoaderIcon className="animate-spin text-primary size-10" />
      </div>
    </div>
  );
}

export default PageLoader;
