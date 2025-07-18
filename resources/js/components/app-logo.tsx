import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <AppLogoIcon className="size-10 fill-current" />
            <div className="ml-1 grid flex-1 text-left text-base">
                <span className="mb-0.5 truncate font-semibold uppercase">DataTable</span>
            </div>
        </>
    );
}
