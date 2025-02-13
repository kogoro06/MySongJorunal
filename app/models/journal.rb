class Journal < ApplicationRecord
  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged

  belongs_to :user
  has_many :favorites, dependent: :destroy
  has_many :favorited_users, through: :favorites, source: :user

  # バリデーション
  validates :title, presence: { message: "日記のタイトルを入力してください" }, length: { maximum: 20, message: "タイトルは20文字以内で入力してください" }
  validates :content, presence: { message: "日記の本文を入力してください" }, length: { maximum: 500, message: "内容は500文字以内で入力してください" }
  validates :emotion, presence: { message: "本日の気持ちを選んでください" }
  validates :song_name, presence: { message: "本日の1曲を選んでください" }, length: { maximum: 100, message: "曲名は100文字以内で入力してください" }
  validates :genre, presence: { message: "音楽のジャンルを選んでください" }

  # 列挙型
  enum genre: {
    j_pop: "j-pop",
    k_pop: "k-pop",
    western: "western",
    anime: "anime",
    vocaloid: "vocaloid",
    others: "others"
  }

  enum emotion: [ :喜, :怒, :哀, :楽 ]

  # ジャンルの表示名と値のマッピング
  MAIN_GENRES = {
    "j-pop" => "J-POP",
    "k-pop" => "K-POP",
    "western" => "洋楽",
    "anime" => "アニメ/特撮",
    "vocaloid" => "ボーカロイド",
    "others" => "その他"
  }.freeze

  # スコープ定義
  scope :by_emotion, ->(emotion) { where(emotion: emotion) if emotion.present? }
  scope :by_genre, ->(genre) { where(genre: genre) if genre.present? }

  def favorited_by?(user)
    favorites.exists?(user_id: user.id)
  end

  def genre_display_name
    MAIN_GENRES[genre] || MAIN_GENRES["others"]
  end

  private

  def slug_candidates
    [
      [ :song_name, :artist_name, "MySongJournal" ],  # 曲名とアーティスト名を使用
      [ :song_name, :artist_name, "MySongJournal", -> { (created_at || Time.current).strftime("%Y%m%d") } ],  # 日付を加える
      [ :song_name, :artist_name, "MySongJournal", -> { (created_at || Time.current).strftime("%Y%m%d%H%M") } ]  # 分単位まで加える
    ]
  end

  def should_generate_new_friendly_id?
    title_changed? || artist_name_changed? || super
  end
end
