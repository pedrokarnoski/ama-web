import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

import { createMessageReaction } from "../http/create-message-reaction";
import { removeMessageReaction } from "../http/remove-message-reaction";

interface MessageProps {
  id: string
  text: string
  amountOfReactions: number
  answered?: boolean
}

export function Message({ id: messageId, text, amountOfReactions, answered = false }: MessageProps) {
  const { roomId } = useParams()

  const [hasReacted, setHasReacted] = useState(false)

  async function createMessageReactionAction() {
    if (!roomId) return

    try {
      await createMessageReaction({ roomId, messageId })
    } catch (error) {
      console.error(error)

      toast.error('Não foi possível reagir a mensagem.')
    }

    setHasReacted(true)
  }

  async function removeMessageReactionAction() {
    if (!roomId) return

    try {
      await removeMessageReaction({ roomId, messageId })
    } catch (error) {
      console.error(error)

      toast.error('Não foi possível reagir a mensagem.')
    }

    setHasReacted(false)
  }

  return (
    <li data-answered={answered} className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none">
      {text}

      {hasReacted ? (
        <button onClick={removeMessageReactionAction} type="button" className="mt-3 flex items-center gap-2 text-sm font-medium text-orange-400 hover:text-orange-500">
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      ) : (
        <button onClick={createMessageReactionAction} type="button" className="mt-3 flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-300">
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      )}

    </li>
  )
}