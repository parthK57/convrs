import Navbar from "../../Components/Navbar/Navbar";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="flex w-screen h-[calc(100vh-60px)] p-10 justify-center items-center rounded-2xl">
        <div className="w-[70%] bg-zinc-100 rounded-2xl">
          <div
            id="title"
            className="border-b px-6 py-2 text-2xl border-zinc-400"
          >
            Title
          </div>
          <div id="info" className="px-6 py-2 flex flex-col rounded-b-2xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure,
            incidunt veniam repudiandae quam voluptatem perferendis facilis
            libero saepe. Iure dolore, vitae nisi quod maiores aut. Eligendi
            fuga error aperiam quod. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sunt natus nisi expedita ducimus nihil error
            voluptas illo illum voluptatem! Fugit. Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Consectetur, dolore et. Eius aliquid
            quibusdam quae, eum ducimus culpa amet, obcaecati, repudiandae velit
            ad sed quaerat magni molestiae fuga! Dolore, soluta? Lorem, ipsum
            dolor sit amet consectetur adipisicing elit. Ratione velit iste enim
            aut, explicabo distinctio saepe officiis perspiciatis omnis alias,
            quae blanditiis dolore molestiae tenetur mollitia. Corporis veniam
            atque optio.
            <p className="mt-3">
              GitHub:{" "}
              <a href="https://github.com/parthK57/convrs" className="underline text-blue-700">parthK57/convrs</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
