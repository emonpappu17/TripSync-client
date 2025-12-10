import { Spinner } from "@/components/ui/spinner";


const GlobalLoading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Spinner className="size-16"/>
        </div>
    );
};

export default GlobalLoading;