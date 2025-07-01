export default function LinkAlternativo({ title, url }) {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-y-8">
      <div className="flex flex-col justify-center cursor-pointer w-full max-w-md">
        <a href={url}>
          <button class="w-full h-full flex items-center justify-center gap-2">
            <style>
              {`
                button {
                  background: #fffdef;
                  border: none;
                  color: black;
                  margin: 1rem 0;
                  padding: 1rem 5rem;
                  font-size: 1rem;
                  transition: transform 0.2s ease-in-out;
                  cursor: pointer;
                  border-radius: 0.4rem;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
                  font-family: 'Inter', sans-serif;
                  font-weight: 500;
                }

                button:hover {
                  transform: scale(1.05);
                }
                
                button:focus {
                  outline: none;
                }

                button:active {
                  transform: scale(0.95);
                }
              `}
            </style>
            <span className="font-semibold">{title}</span>
          </button>
        </a>
      </div>
    </div>
  );
}

