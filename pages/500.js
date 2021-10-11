import Logo from "../assets/vslogo.svg";

export default function Custom500() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div>
        <div className="h-12 mb-4 flex justify-center">
          <Logo className="h-full" />
        </div>
        <h1 className="text-2xl text-center">
          Flow currently under maintenance.
          <br />
          We&apos;ll be back soon!
        </h1>
      </div>
    </div>
  );
}
