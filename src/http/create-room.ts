interface CreateRoomRequest {
  theme: string
}

export async function createRoom({ theme }: CreateRoomRequest) {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms`, {
    method: 'POST',
    body: JSON.stringify({ theme }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data: { id: string } = await response.json()

  return { roomId: data.id }
}