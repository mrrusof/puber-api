class CreateRoads < ActiveRecord::Migration[5.0]
  def change
    create_table :roads do |t|
      t.datetime :dep_time
      t.text :path
      t.integer :capacity
      t.integer :allow_delta_dist
      t.integer :allow_delta_time

      t.timestamps
    end
  end
end
