import Link from "next/link";

const AboutCreator = () => {
  return (
    <div className="bg-white py-12">
      <div className="container">
        <h3 className="font-black font-inktrap text-2xl">About the Creator</h3>
        <div className="gap-12 grid grid-cols-12 mt-4">
          <div className="bg-cream-500 col-span-4 flex flex-col items-center justify-center px-12 py-12 rounded">
            <div className="bg-white h-20 p-1 rounded-full shadow-lg w-20">
              <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
                className="h-full object-cover rounded-full w-full"
              />
            </div>
            <h4 className="font-black font-inktrap text-2xl text-center">
              Alessandro Pautasso
            </h4>
            <p className="font-bold font-inktrap mb-2 text-center">@kaneda99</p>
            <Link href="#">
              <a className="standard-button transparent-button">
                Artist profile
              </a>
            </Link>
          </div>
          <div className="col-span-8 text-lg">
            <p>
              Alessandro Pautasso is a digital artist living in California
              inspired by futurism, innovation and how current events will be
              judged by future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCreator;
