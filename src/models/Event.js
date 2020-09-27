export class Event {
  #id;
  #name;
  #description;
  #startTime;
  #endTime;
  #sponsor;
  #type;
  #favorite;

  constructor(id, name, description, startTime, endTime, sponsor, type, favorite = false) {
    this.#id = id;
    this.#name = name;
    this.#description = description;
    this.#startTime = startTime;
    this.#endTime = endTime;
    this.#sponsor = sponsor;
    this.#type = type;
    this.#favorite = favorite;
  }

  createCopy() {
    return new Event(
      this.id,
      this.name,
      this.description,
      this.startTime,
      this.endTime,
      this.sponsor,
      this.type,
    )
  }

  static eventFromResponse(responseEvent) {
    return new Event(
      responseEvent.id,
      responseEvent.name,
      responseEvent.description,
      responseEvent.startTime,
      responseEvent.endTime,
      responseEvent.sponsor,
      responseEvent.eventType,
    );
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get description() {
    return this.#description;
  }

  get startTime() {
    return this.#startTime;
  }

  get endTime() {
    return this.#endTime;
  }

  get sponsor() {
    return this.#sponsor;
  }

  get type() {
    return this.#type;
  }

  get favorite() {
    return this.#favorite;
  }

  toggleFavorite = () => {
    const event = this.createCopy(this);
    event.#favorite = !this.#favorite;
    return event;
  };
}
