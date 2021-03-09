import Model from '../../-model';

const identified = type => () => {
  return {
    get() {
      return this.nodes.all.filter(model => model.type === type && model.identifier);
    }
  };
}

export default class IdentifiedNodes extends Model {

  constructor(owner, { nodes }) {
    super(owner);
    this.nodes = nodes;
  }

  @identified('palette') palettes;
  @identified('sprite') sprites;

}
