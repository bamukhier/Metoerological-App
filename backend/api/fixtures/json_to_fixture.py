import json
import copy

with open('cities.json', encoding="utf8") as df, open('cities-fixture.json', 'w', encoding="utf8") as out:
    data = json.load(df)
    newdata = []
    for i, block in enumerate(data):
        new = dict(model="api.City", pk=block['city_id'])
        new['fields'] = dict(region_id=block['region_id'],
                             name_ar=block['name_ar'],
                             name_en=block['name_en'],
                             lat=block['center'][0],
                             long=block['center'][1])
        newdata.append(copy.deepcopy(new))
    json.dump(newdata, out, indent=2)