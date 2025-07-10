import React, { useContext, useEffect, useRef, useState } from 'react'
import Footer from './Footer'
import { Link, useNavigate } from 'react-router-dom'
import Hero from './Hero'
import { userContext } from '../App'

const Home = () => {
  const [data, setData] = useState([])
  const [skeleton] = useState([1, 2, 3, 4, 5, 6, 76, 75, 77, 19, 716, 115, 545, 45, 343, 112])
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [filter, setFilter] = useState([])
  const {userToken} = useContext(userContext)
  const navigate = useNavigate()


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);


  // fetching data 

  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products")
        if (response) {
          const data = await response.json()
          
          setData(data)
          setFilter(data)
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchFunc()
     document.title = "Welcome to HappyShop"
  }, [])


  const filterFunc = (title) => {
    const filtered = filter.filter((item) => item.category === title)
    setData(filtered)
  }



  useEffect(() => {
    if (!userToken) {
      navigate("/login")
    }
  })

  return (
    <>
      <Hero />
      <div className="bg-white pt-0" ref={dropdownRef}>
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

          <div className='flex justify-between'>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Latest Products
            </h2>
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex w-full justify-center outline-none border-none bg-green-700 text-white gap-x-1.5 rounded-md px-3 py-2  font-semibold  shadow-sm ring-1 "
                  id="menu-button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={toggleDropdown}
                >
                  Filters
                  <svg
                    className="-mr-1 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {isOpen &&
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex={-1}
                >
                  <div className="py-1" role="none">
                    <h5

                      className="block px-4 py-2 text-sm text-gray-700  hover:bg-blue-800 hover:text-white cursor-pointer"
                      role="menuitem"
                      tabIndex={-1}
                      onClick={() => setData(filter)}
                      id="menu-item-4"
                    >
                      All
                    </h5>

                    <h5

                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-800 hover:text-white cursor-pointer"
                      role="menuitem"
                      tabIndex={-1}
                      onClick={() => filterFunc("electronics")}
                      id="menu-item-0"
                    >
                      Electronics
                    </h5>
                    <h5

                      className="block px-4 py-2 text-sm text-gray-700  hover:bg-blue-800 hover:text-white cursor-pointer"
                      role="menuitem"
                      tabIndex={-1}
                      onClick={() => filterFunc("women's clothing")}
                      id="menu-item-1"
                    >
                      Women's Ware
                    </h5>
                  </div>
                  <div className="py-1" role="none">
                    <h5

                      className="block px-4 py-2 text-sm text-gray-700  hover:bg-blue-800 hover:text-white cursor-pointer"
                      role="menuitem"
                      tabIndex={-1}
                      onClick={() => filterFunc("men's clothing")}
                      id="menu-item-2"
                    >
                      Men's Ware
                    </h5>
                    <h5

                      className="block px-4 py-2 text-sm text-gray-700  hover:bg-blue-800 hover:text-white cursor-pointer"
                      role="menuitem"
                      tabIndex={-1}
                      onClick={() => filterFunc("jewelery")}
                      id="menu-item-3"
                    >
                      Jewelery
                    </h5>
                  </div>

                </div>
              }


            </div>


          </div>
          <hr className='my-3' />
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

            {data.length ? <>
              {data.map((item) => (

                <Link to={`/${item.id}`} key={item.id} className="group w-72 p-3 relative  hover:opacity-85">
                  <div className=''>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-72 w-72 "
                    />
                  </div>

                  <div className="mt-4 flex justify-between ">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href="#">
                          <span aria-hidden="true" className="absolute inset-0" />
                          {item.title}
                        </a>
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-nowrap text-gray-900">$ {item.price}</p>
                  </div>
                </Link>
              ))}
            </> : <>
              {skeleton.map((it) => (
                <div key={it} className="w-72 animate-pulse rounded">
                  <div className="bg-slate-400 rounded h-72 w-72 "
                  ></div>
                  <div className="mt-4 flex justify-between ">
                    <div>
                      <h3 className="text-sm  bg-slate-400 h-4 w-72 ">
                      </h3>
                      <h3 className="text-sm mt-2 bg-slate-400 h-4 w-48 ">
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </>
            }
          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}

export default Home