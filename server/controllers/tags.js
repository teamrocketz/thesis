const models = require('../../db/models');

module.exports.addTag = (req, res) => {
  console.log('add tag');
  models.Tag.forge({
    name: req.body.name,
    profile_id: req.user.id,
    page_id: req.body.pageId,
  })
  .then((tag) => {
    console.log('tag saved');
    console.log(tag);
    res.status(200).send(tag);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
};

module.exports.removeTag = (req, res) => {
  console.log('remove tag');
  models.Tag.where({
    name: req.body.name,
    profile_id: req.user.id,
    page_id: req.body.pageId,
  })
  .fetch()
  .then((tag) => {
    if (!tag) {
      throw new Error(`Tag ${req.body.tagName} not found`);
    } else {
      return tag.destroy();
    }
  })
  .then(() => {
    res.status(200).send('Tag destroyed');
  })
  .catch((err) => {
    console.log(`Error destorying ${req.body.tagName}`);
    res.status(500).send(err);
  });
};
