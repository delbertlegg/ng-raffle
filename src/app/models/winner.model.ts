import { ID } from '@datorama/akita';
import { Person } from './person.model';

export interface Winner {
    id: ID;
    ticketNumber: number;
    raffleName: String;
    winner: Person;
    prizeClaimed: boolean;
}

export function createWinner({
    id = null, ticketNumber = null, raffleName = null, winner = null, prizeClaimed = false
}: Partial<Winner>) {
    return {
        id,
        ticketNumber,
        raffleName,
        winner,
        prizeClaimed
    };
}

export function fromWinner(winner: Winner): Winner {
    return {
        id: winner.id,
        ticketNumber: winner.ticketNumber,
        raffleName: winner.raffleName,
        winner: winner.winner,
        prizeClaimed: winner.prizeClaimed
    };
}
