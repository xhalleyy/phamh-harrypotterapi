'use client'
import { getAllCharacters } from "@/utils/DataServices";
import Image from "next/image";
import NavbarComponent from "./components/NavbarComponent";
import { useEffect, useState } from "react";
import CharacterModalComponent from "./components/CharacterModalComponent";
import { Pagination } from "flowbite-react";

export default function Home() {

  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterType | null>(null);

  //pagination 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const charactersPerPage = 15;

  // getting the last person index of each page, 
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters?.slice(indexOfFirstCharacter, indexOfLastCharacter);
  const totalPages = characters.length > 0 ? Math.ceil(characters.length / charactersPerPage) : 1;
  const onPageChange = (page: number) => setCurrentPage(page);

  useEffect(() => {
    const charactersData = async () => {
      const data = await getAllCharacters();
      setCharacters(data);
    }
    charactersData();
  }, [])

  const openCharacterInfo = (character: CharacterType) => {
    setSelectedCharacter(character)
    setOpenModal(true);
  }

  return (
    <div className="harrypbg">
      <div>
        <NavbarComponent />
      </div>

      <div className="grid grid-cols-5 gap-5 pb-5">
        {characters.slice((currentPage - 1) * charactersPerPage, currentPage * charactersPerPage).map((character, idx) => (
          <div key={idx} className="col-span-1 flex justify-center cursor-pointer" onClick={() => openCharacterInfo(character)}>
            <div className="flex flex-col rounded-xl">
              <div className="h-[250px] w-[210px] object-fill">
                {character?.image ? <img src={character?.image} alt="" className='h-[250px] object-fill rounded-xl' /> :
                  <Image
                    src="/default.jpg"
                    width={250}
                    height={250}
                    alt="Picture of the author"
                    className='rounded-xl'
                    priority
                  />
                }
              </div>
              <p className=" text-center text-2xl text-white font-bold">{character.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>

      <CharacterModalComponent openModal={openModal} setOpenModal={setOpenModal} character={selectedCharacter} />
    </div>
  );
}
