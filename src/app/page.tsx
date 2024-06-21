'use client'
import { getAllCharacters } from "@/utils/DataServices";
import Image from "next/image";
import NavbarComponent from "./components/NavbarComponent";
import { useEffect, useState } from "react";
import CharacterModalComponent from "./components/CharacterModalComponent";
import { Pagination } from "flowbite-react";
import CarouselComponent from "./components/CarouselComponent";

export default function Home() {

  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [slicedChars, setSlicedChars] = useState<CharacterType[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterType | null>(null);
  const [searchName, setSearchName] = useState('')

  //pagination 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const charactersPerPage = 15;

  // getting the last person index of each page, (i.e. first page 1 * 20 = 20 or 2* 20 = 40)
  // we get the first index by taking the last index of the page and minusing how many characters there are
  // slicing the index of the first char index to the last index FOR THAT PAGE
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters?.slice(indexOfFirstCharacter, indexOfLastCharacter);
  const totalPages = characters.length > 0 ? Math.ceil(characters.length / charactersPerPage) : 1;
  const onPageChange = (page: number) => setCurrentPage(page);

  const customImages: { [key: string]: string } = {
    "Harry Potter": "/harrypotter.webp",
    "Hermione Granger": "/hermione.jpg",
    "Ron Weasley": "/ronweasley.jpg",
    "Draco Malfoy": "/dracomalfoy.webp",
    "Minerva McGonagall": "/mcgonagoll.jpg",
    "Cedric Diggory": "/dracomalfoy.webp",
    "Cho Chang": "/chochang.webp",
    "Severus Snape": "/snape.webp",
    "Albus Dumbledor": "albus.webp",
    "Lily Potter": "lilypotter.webp",
    "James Potter": "JamesPotter.webp",
    "Petunia Dursley": "petuniadursley.webp",
    "Vernon Dursley": "vernondursley.png",
    "Dudley Dursley": "dudleydursley.png",
  };

  useEffect(() => {
    const charactersData = async () => {
      const data = await getAllCharacters();
      const updatedData = data.map(character => ({
        ...character,
        image: customImages[character.name] || character.image || '/default.jpg'
      }));
      setCharacters(updatedData);
      // setCharacters(data);
    }
    charactersData();
    
  }, [])

  useEffect(() => {
    const sliced = characters.slice(8);
    setSlicedChars(sliced);
  }, [characters]);

  const openCharacterInfo = (character: CharacterType) => {
    setSelectedCharacter(character)
    setOpenModal(true);
  }

  const handleCharacterInfo = () => {
    const foundCharacter = characters.find(char => char.name.toLowerCase().includes(searchName.toLowerCase()));
    // const foundCharacter = characters.find(char => char.name.toLowerCase() === searchName.toLowerCase());
    if (foundCharacter) {
      openCharacterInfo(foundCharacter);
    } else {
      alert('Character not found');
    }
  };

  return (
    <div className="harrypbg">
      <div>
        <NavbarComponent
          searchName={searchName}
          setSearchName={setSearchName}
          handleCharacterInfo={handleCharacterInfo}
        />
      </div>

      <div className={ 'px-[130px] mb-2'}>
            <CarouselComponent characters={characters} openCharacterInfo={openCharacterInfo}/>
        </div>

      <div className="grid grid-cols-5 gap-5 pb-5">
        {slicedChars.slice((currentPage - 1) * charactersPerPage, currentPage * charactersPerPage).map((character, idx) => (
          <div key={idx} className="col-span-1 flex justify-center cursor-pointer pb-5" onClick={() => openCharacterInfo(character)}>
            <div className="flex flex-col rounded-xl items-center">
              <div className="h-[230px] w-[180px] flex justify-center">
                {character?.image ? <img src={character?.image} alt="" className='object-cover rounded-xl shadow-xl' /> :
                  <Image
                    src="/default.jpg"
                    width={250}
                    height={250}
                    alt="Picture of the author"
                    className='rounded-xl shadow-xl'
                    priority
                  />
                }
              </div>
              <p className=" text-center text-2xl text-white text-wrap font-kodchasan-semi">{character.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pb-10">
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
