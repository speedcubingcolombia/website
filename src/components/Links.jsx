export default function LinkAlternativo({ title, url }) {
  return (
    <div className="flex flex-col items-center w-full gap-y-8">
      <div className="flex flex-col justify-center cursor-pointer w-full p-4 text-sm text-center text-white transition-all duration-500 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl lg:text-xl hover:bg-opacity-40 hover:scale-110">
        <a href={url}>
          <button>
            <span className="font-semibold">{title}</span>
          </button>
        </a>
      </div>
    </div>
  );
}

