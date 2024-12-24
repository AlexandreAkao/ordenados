function Card() {
  return (
    <div className="group h-96 w-72 perspective-1000">
      <div className="relative w-full h-full preserve-3d transition-transform duration-1000 group-hover:rotate-y-180">
        <div className="rounded-2xl absolute bg-red-600 w-full h-full backdrop-blur shadow-xl">
          front
        </div>
        <div className="rounded-2xl absolute bg-green-600 w-full h-full rotate-y-180 backface-hidden backdrop-blur shadow-xl">
          back
        </div>
      </div>
    </div>
  );
}

export default Card;
