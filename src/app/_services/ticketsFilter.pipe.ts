import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ticketsFilter'
})
export class TicketsFilterPipe implements PipeTransform {

  transform(ticketsList: any, sCityKeyword: string, dCityKeyword: string, dateSearch: Date): any {
    if (!ticketsList) {
      return [];
    }

    if (!sCityKeyword && !dCityKeyword && !dateSearch) {
      return ticketsList;
    }

    const filteredList = [];

    if (ticketsList.length > 0 && !sCityKeyword && !dCityKeyword && dateSearch) {
      ticketsList.forEach(ticket => {
        if (ticket.date.toString().substr(0, 10) === dateSearch) {
          filteredList.push(ticket);
        }
      });
      return filteredList;
    }

    if (ticketsList.length > 0 && sCityKeyword && !dCityKeyword && dateSearch) {
      sCityKeyword = sCityKeyword.toLowerCase();
      ticketsList.forEach(ticket => {
        if (ticket.startingCity.toString().toLowerCase().indexOf(sCityKeyword.toLowerCase()) > -1
            && ticket.date.toString().substr(0, 10) === dateSearch) {
          filteredList.push(ticket);
        }
      });
      return filteredList;
    }

    if (ticketsList.length > 0 && sCityKeyword && !dCityKeyword && !dateSearch) {
      sCityKeyword = sCityKeyword.toLowerCase();
      ticketsList.forEach(ticket => {
        if (ticket.startingCity.toString().toLowerCase().indexOf(sCityKeyword.toLowerCase()) > -1) {
          filteredList.push(ticket);
        }
      });
      return filteredList;
    }

    if (ticketsList.length > 0 && dCityKeyword && !sCityKeyword && dateSearch) {
      dCityKeyword = dCityKeyword.toLowerCase();
      ticketsList.forEach(ticket => {
        if (ticket.destinationCity.toString().toLowerCase().indexOf(dCityKeyword.toLowerCase()) > -1
            && ticket.date.toString().substr(0, 10) === dateSearch) {
          filteredList.push(ticket);
        }
      });
      return filteredList;
    }

    if (ticketsList.length > 0 && dCityKeyword && !sCityKeyword && !dateSearch) {
      dCityKeyword = dCityKeyword.toLowerCase();
      ticketsList.forEach(ticket => {
        if (ticket.destinationCity.toString().toLowerCase().indexOf(dCityKeyword.toLowerCase()) > -1) {
          filteredList.push(ticket);
        }
      });
      return filteredList;
    }

    if (ticketsList.length > 0 && dCityKeyword && sCityKeyword && dateSearch) {
      sCityKeyword = sCityKeyword.toLowerCase();
      dCityKeyword = dCityKeyword.toLowerCase();
      ticketsList.forEach(ticket => {
        if (ticket.destinationCity.toString().toLowerCase().indexOf(dCityKeyword.toLowerCase()) > -1
            && ticket.startingCity.toString().toLowerCase().indexOf(sCityKeyword.toLowerCase()) > -1
            && ticket.date.toString().substr(0, 10) === dateSearch) {
          filteredList.push(ticket);
        }
      });
      return filteredList;
    }

    if (ticketsList.length > 0 && dCityKeyword && sCityKeyword && !dateSearch) {
      sCityKeyword = sCityKeyword.toLowerCase();
      dCityKeyword = dCityKeyword.toLowerCase();
      ticketsList.forEach(ticket => {
        if (ticket.destinationCity.toString().toLowerCase().indexOf(dCityKeyword.toLowerCase()) > -1
        && ticket.startingCity.toString().toLowerCase().indexOf(sCityKeyword.toLowerCase()) > -1) {
          filteredList.push(ticket);
        }
      });
      return filteredList;
    }

  }
  

}
