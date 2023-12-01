import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { generatePlaylist } from '../utils/playlistCreate'
import Spotify from '../api/spotifyApi'
import QRCode from 'react-qr-code'

function Root() {
    Spotify.getAccessToken()
    const [numPlaylists, setNumPlaylists] = React.useState(0)
    const [plays, setPlays] = React.useState(new Set<string>())
    const [generatedPlaylist, setGeneratedPlaylist] = React.useState([])
    const [show, setShow] = React.useState(false)
    const [isModalVisible, setIsModalVisible] = React.useState(false)
    const [playlistURl, setPlaylistURL] = React.useState('')

    useEffect(() => {
        console.log(playlistURl)
    }, [playlistURl])

    const handleButtonClick = () => {
        setIsModalVisible(!isModalVisible)
    }

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const playlistButtonClick = (
        name: string,
        numPlaylists: number,
        plays: Set<any>
    ) => {
        console.log(name + 'button clicked')
        const playlistButton = document.getElementById(
            `${name}_Button`
        ) as HTMLDivElement
        if (playlistButton.style.backgroundColor === 'white') {
            playlistButton.style.backgroundColor = 'green'
            setNumPlaylists(++numPlaylists)
            plays.add(name.toLowerCase().replace(' ', ''))
            console.log(plays)
            setPlays(plays)
        } else if (playlistButton.style.backgroundColor === 'green') {
            playlistButton.style.backgroundColor = 'white'
            setNumPlaylists(--numPlaylists)
            plays.delete(name.toLowerCase().replace(' ', ''))
            setPlays(plays)
        }

        console.log('numPlaylists: ' + numPlaylists)
        console.log({ plays })
    }
    return (
        <div className="flex h-screen flex-row bg-gradient-to-br from-red-500 to-yellow-500">
            <div
                className={`fixed z-50 ${
                    isModalVisible ? '' : 'hidden'
                    // 'fixed'
                } flex max-h-full w-full items-center justify-center bg-black bg-opacity-50 md:inset-0`}
            >
                {/* <!-- Main modal --> */}
                <div
                    id="default-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="relative max-h-full w-full max-w-md p-4"
                >
                    {/* <!-- Modal content --> */}
                    <div className="relative rounded-lg bg-white shadow ">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between rounded-t border-b p-4  md:p-5">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Your Playlist has been Generated!
                            </h3>
                            <button
                                type="button"
                                className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
                                data-modal-hide="default-modal"
                                onClick={handleButtonClick}
                            >
                                <svg
                                    className="h-3 w-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="space-y-4 p-4 md:p-5">
                            <p className="text-base leading-relaxed text-gray-500 ">
                                Your playlist has been brewed! Follow the link
                                below to add it to your Spotify library.
                            </p>
                            <div className="py7 flex items-center justify-center self-center">
                                <QRCode value={`${playlistURl}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <button
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                className="block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 "
                type="button"
                onClick={handleButtonClick}
            >
                Toggle modal
            </button> */}

            <div className="my-20 flex w-2/5 flex-col justify-between">
                <div className="flex flex-col gap-10">
                    <div
                        className="mx-10 rounded-2xl bg-white p-4"
                        onClick={handleShow}
                    >
                        <p className="py-4 text-4xl">Riffresh</p>
                        <p className="text-sm text-neutral-700">
                            Riffresh is a modern jukebox built to curate
                            playlists. Flavors are with hand-picked songs and
                            updated regularly. Press and hold the flavors to
                            drop it into your unique playlist!
                        </p>
                    </div>

                    <div id="dis" className="mx-10 rounded-2xl bg-white p-4">
                        <p>Flavor in your soda</p>
                        <div>
                            {Array.from(plays).map((name, index) => (
                                <div key={index}>{name}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <div
                    className="mx-10 cursor-pointer rounded-2xl bg-white p-4"
                    style={{
                        background:
                            'radial-gradient(110.94% 110.94% at 50% 50%, #EFEEEE 0%, rgba(239, 238, 238, 0.00) 100%)',
                        backdropFilter: 'blur(23.200000762939453px)',
                    }}
                    onClick={() => {
                        if (numPlaylists !== 0) {
                            console.log('generate playlist')
                            Spotify.savePlaylist(
                                plays,
                                generatePlaylist(plays),
                                setPlaylistURL
                            )
                            handleButtonClick()
                        }

                        // Spotify.savePlaylist(
                        //     ['test'],
                        //     ['spotify:track:0z1o5L7HJx562xZSATcIpY?si']
                        // )
                        // https://open.spotify.com/track/0z1o5L7HJx562xZSATcIpY
                    }}
                >
                    <div className="m-1 flex flex-row rounded-lg bg-white p-4">
                        <div className=" -rotate-90">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M11.9531 23.918C18.4922 23.918 23.9062 18.5039 23.9062 11.9648C23.9062 5.4375 18.4805 0.0117188 11.9414 0.0117188C5.41406 0.0117188 0 5.4375 0 11.9648C0 18.5039 5.42578 23.918 11.9531 23.918Z"
                                    fill="#1DB954"
                                    fill-opacity="0.85"
                                />
                                <path
                                    d="M17.0275 11.9648C17.0275 14.7305 16.219 17.4258 14.7307 19.5352C14.4377 19.9453 13.9338 20.0391 13.5705 19.7812C13.1838 19.4883 13.1135 18.9961 13.3947 18.5977C14.6838 16.7695 15.3986 14.3906 15.3986 11.9648C15.3986 9.50391 14.6955 7.14844 13.3947 5.33203C13.1135 4.92188 13.1838 4.42969 13.5705 4.14844C13.9455 3.86719 14.4494 3.96094 14.7307 4.38281C16.219 6.52734 17.0275 9.19922 17.0275 11.9648Z"
                                    fill="white"
                                />
                                <path
                                    d="M13.2537 11.9648C13.2537 13.9688 12.656 15.9258 11.5779 17.4375C11.285 17.8242 10.8045 17.9297 10.4295 17.6484C10.0545 17.3906 9.96077 16.875 10.2537 16.4531C11.1092 15.2695 11.6014 13.6406 11.6014 11.9648C11.6014 10.2773 11.1092 8.64848 10.2537 7.46488C9.96077 7.04301 10.0545 6.52738 10.4295 6.26957C10.8045 6.00004 11.285 6.09379 11.5779 6.49223C12.656 7.95707 13.2537 9.9141 13.2537 11.9648Z"
                                    fill="white"
                                />
                                <path
                                    d="M9.46866 11.9648C9.46866 13.2305 9.09366 14.4844 8.46085 15.3281C8.19132 15.7031 7.68741 15.8086 7.31241 15.5508C6.90225 15.2461 6.82022 14.7422 7.12491 14.3086C7.5585 13.7109 7.81632 12.8438 7.81632 11.9648C7.81632 11.0508 7.5585 10.1836 7.12491 9.60936C6.8085 9.17576 6.89053 8.64842 7.31241 8.35545C7.68741 8.10936 8.1796 8.21482 8.46085 8.5781C9.09366 9.48045 9.46866 10.7344 9.46866 11.9648Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                        <div className=" px-2">
                            Generate Playlist on Spotify
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-3/5 items-center">
                <div className="rounded-2xl bg-white">
                    <div
                        id="buttonGrid"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gridTemplateRows: 'repeat(3, 1fr)',
                        }}
                        className="gap-10"
                    >
                        {[
                            'Wine',
                            'Sweetner',
                            'Probiotic',
                            'Spice',
                            'Water',
                            'Foam',
                            'Crushed Ice',
                            'Caffeine',
                            'Sugar',
                            'Lemonade',
                        ].map((playlistName, index) => (
                            <div
                                key={index}
                                id={`${playlistName}_Button`}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                                className="m-5 flex h-28 w-28 cursor-pointer items-center justify-center rounded-full border-8 border-black bg-white"
                                onClick={() =>
                                    playlistButtonClick(
                                        playlistName,
                                        numPlaylists,
                                        plays
                                    )
                                }
                            >
                                {playlistName}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Root
