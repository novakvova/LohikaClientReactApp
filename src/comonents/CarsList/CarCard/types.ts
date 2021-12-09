export  interface ICartButtonProps {
    onClick(): void

}

export interface CarCardProps {
    id: number;
    name: string;
    price: number;
    image: string;
    inCart?: boolean
  }