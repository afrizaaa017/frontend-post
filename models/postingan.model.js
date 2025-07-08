// Model Postingan (frontend, referensi dari backend)
export class Postingan {
  constructor(data) {
    this.id = data?.id || '';
    this.title = data?.title || '';
    this.content = data?.content || '';
  }
}
