import { useRef, useState } from "react";
import { textToImage } from "../../../utils/ai-services";
import ImagePreview from "../../components/ImagePreview";

export default function TextToImage() {
  const [prompt, setPrompt] = useState("");
  const [displayPrompt, setDisplayPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadingRef = useRef(null);

  const generateImage = async () => {
    loadingRef.current.hidden = false;

    if (prompt !== "") {
      setIsLoading(true);

      try {
        const image = await textToImage(prompt);
        setGeneratedImage(image);
        loadingRef.current.hidden = true;
        setIsLoading(false);
        setDisplayPrompt(prompt);
      } catch (e) {
        loadingRef.current.hidden = true;
        setIsLoading(false);
        alert("An error occurred while generating the image", e);
      }
    } else {
      loadingRef.current.hidden = true;
      alert("Please enter a prompt to generate an image...");
      return;
    }
    setPrompt("");
  };

  return (
    <>
      <div className=" w-3/4 flex flex-col justify-center p-5 m-5 gap-y-5 bg-primary rounded shadow mx-auto border-l-4 border-r-4">
        <div className="mx-auto flex text-2xl font-semibold items-center gap-x-3 border-b-2 pb-2">
          <p>AI Text To Image</p>
          <img
            src="/media/ai-text2image-logo.png"
            alt="logo"
            width={64}
            height={64}
          />
          <p className=" text-xs italic">
            Imagine it, <br /> describe it, <br /> And see it come to life.
          </p>
        </div>

        <div className="flex flex-row p-5 gap-x-16">
          {/* USER PROMPT */}
          <div className="basis-2/5 flex flex-col gap-y-8 items-center">
            <textarea
              name="text"
              rows={6}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a prompt to generate an image..."
              className="w-full rounded-md p-2 text-xl tracking-wide bg-white focus:outline-none focus:ring-2 focus:ring-black"
            ></textarea>

            <button
              className="bg-secondary w-3/5 font-semibold rounded-md px-3 py-2 ring-transition text-white tracking-wide"
              onClick={generateImage}
            >
              Generate Image
            </button>
            <div className="animate-spin" hidden ref={loadingRef}>
              <img src="/media/reload.png" alt="load" width={32} height={32} />
            </div>
            <p className="text-sm italic">
              (Once the Image is generated by AI, click on it to download the
              Image...)
            </p>
            {/* PROMPT DISPLAY */}
            {displayPrompt && (
              <div className="bg-accent-1 p-3 rounded-lg shadow-lg w-full space-y-2">
                <p className="text-md font-semibold">Image Prompt: </p>
                <p className=" text-normal italic">{displayPrompt}</p>
              </div>
            )}
          </div>

          {/* GENERATED IMAGE PREVIEW  */}
          <ImagePreview isLoading={isLoading} imgUrl={generatedImage} />
        </div>
      </div>
    </>
  );
}
