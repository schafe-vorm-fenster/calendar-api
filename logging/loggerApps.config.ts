export namespace api {
  export enum organizers {
    get = 'api.organizers.get',
  }
  export enum calendars {
    get = 'api.calendars.get',
  }
}

export namespace apiclient {
  export enum zendesksell {
    get = 'apiclient.zendesksell.get',
  }
  export enum googlecalendar {
    get = 'apiclient.google.calendar.get',
  }
  export enum googleevents {
    get = 'apiclient.google.events.get',
    fetch = 'apiclient.google.events.fetch',
  }
}

export namespace aggregations {
  export enum zendesksell {
    googlecalendar = 'aggregations.zendesksell.with.googlecalendar',
  }
}
